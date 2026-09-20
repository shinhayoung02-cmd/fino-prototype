import { useEffect, useRef, useState } from 'react'

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY

export const DEFAULT_MAP_CENTER = { lat: 37.5563, lng: 126.9237 } // 홍대입구역 9번 출구 인근

let kakaoLoadPromise = null
export function loadKakaoMaps() {
  if (window.kakao?.maps?.services) return Promise.resolve(window.kakao)
  if (!KAKAO_JS_KEY) return Promise.reject(new Error('missing VITE_KAKAO_JS_KEY'))
  if (!kakaoLoadPromise) {
    kakaoLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&autoload=false&libraries=services`
      script.onload = () => window.kakao.maps.load(() => resolve(window.kakao))
      script.onerror = () => {
        kakaoLoadPromise = null
        reject(new Error('kakao maps script failed to load'))
      }
      document.head.appendChild(script)
    })
  }
  return kakaoLoadPromise
}

/**
 * Mounts a live Kakao map into the returned containerRef. Falls back to
 * mapFailed=true (render a static image instead) if the SDK can't load
 * or the free quota/service is unavailable.
 */
export function useKakaoMap({ center = DEFAULT_MAP_CENTER, level = 4, draggable = true, zoomable = true } = {}) {
  const containerRef = useRef(null)
  const kakaoRef = useRef(null)
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [mapFailed, setMapFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadKakaoMaps()
      .then((kakao) => {
        if (cancelled || !containerRef.current) return
        const map = new kakao.maps.Map(containerRef.current, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level,
          draggable,
          zoomable,
        })
        kakaoRef.current = kakao
        mapRef.current = map
        setMapReady(true)
      })
      .catch(() => {
        if (!cancelled) setMapFailed(true)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // keep draggable/zoomable in sync if they change after the map is created
  useEffect(() => {
    if (!mapReady) return
    mapRef.current.setDraggable(draggable)
    mapRef.current.setZoomable(zoomable)
  }, [mapReady, draggable, zoomable])

  return { containerRef, kakaoRef, mapRef, mapReady, mapFailed }
}

import { useMemo, useState } from 'react'
import {
  findNearestPlace,
  lngLabel,
  searchPlaces,
  type Place,
} from '@/data/locations'

type Props = {
  selected: Place | null
  lng: string
  utc: string
  onSelect: (place: Place) => void
  onLngChange: (v: string) => void
  onUtcChange: (v: string) => void
}

/** 真太阳时地点：搜索城市 → 可选区县 → 选中后展示区域并回填经度/时区 */
export function LocationPicker({
  selected,
  lng,
  utc,
  onSelect,
  onLngChange,
  onUtcChange,
}: Props) {
  const [query, setQuery] = useState('')
  const [geoHint, setGeoHint] = useState<string | null>(null)

  const results = useMemo(() => searchPlaces(query), [query])

  const useCurrent = () => {
    if (!navigator.geolocation) {
      const fallback = findNearestPlace(116.41)
      onSelect(fallback)
      setQuery(fallback.name)
      setGeoHint('当前环境不支持定位，已回落北京。')
      return
    }
    setGeoHint('正在获取位置…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const place = findNearestPlace(pos.coords.longitude, pos.coords.latitude)
        onSelect(place)
        setQuery(place.city)
        setGeoHint(`已按经度就近匹配：${place.city}`)
      },
      () => {
        const fallback = findNearestPlace(116.41)
        onSelect(fallback)
        setQuery(fallback.name)
        setGeoHint('定位失败，已回落北京。')
      },
      { timeout: 8000 },
    )
  }

  const pick = (place: Place) => {
    onSelect(place)
    // 选到区后，搜索框保留区名；选到市则保持市名以便继续看区
    setQuery(place.kind === 'district' ? place.name : place.city)
    setGeoHint(null)
  }

  return (
    <div className="loc-picker">
      <div className="loc-picker-head">
        <span className="form-lbl" style={{ margin: 0 }}>📍 真太阳时地点</span>
        <button type="button" className="btn btn-sm" onClick={useCurrent}>使用当前位置</button>
      </div>

      <span className="form-lbl">搜索城市</span>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索城市或区县，如 广州 / 荔湾区 / 杭州"
        style={{ marginBottom: '0.5rem' }}
      />

      {geoHint && (
        <p className="muted" style={{ fontSize: '0.76rem', margin: '0 0 0.5rem' }}>{geoHint}</p>
      )}

      <div className="loc-grid" role="listbox" aria-label="地点列表">
        {results.map((p) => {
          const active = selected?.id === p.id
          return (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected={active}
              className={`loc-item${active ? ' active' : ''}`}
              onClick={() => pick(p)}
            >
              <span className="loc-item-name">
                {p.name} <small>{p.country}</small>
                {p.kind === 'district' && <small className="loc-item-city"> · {p.city}</small>}
              </span>
              <span className="loc-item-meta">
                <small>UTC{p.utc >= 0 ? `+${p.utc}` : p.utc}</small>
                <small>{lngLabel(p.lng)}</small>
              </span>
            </button>
          )
        })}
        {results.length === 0 && (
          <p className="muted" style={{ gridColumn: '1 / -1', fontSize: '0.82rem', margin: '0.5rem 0' }}>
            没有匹配地点，可改关键词或手动填经度。
          </p>
        )}
      </div>

      {selected && (
        <div className="loc-selected" aria-live="polite">
          <div>
            <strong>{selected.name} {selected.country}</strong>
            {selected.kind === 'district' && (
              <span className="muted" style={{ fontSize: '0.78rem', marginLeft: '0.35rem' }}>{selected.city}</span>
            )}
          </div>
          <div className="loc-item-meta">
            <small>UTC{selected.utc >= 0 ? `+${selected.utc}` : selected.utc}</small>
            <small>{lngLabel(selected.lng)}</small>
          </div>
        </div>
      )}

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
        <label className="field">
          <span>手动经度</span>
          <input
            value={lng}
            onChange={(e) => onLngChange(e.target.value)}
            placeholder="例如 116.4074"
          />
        </label>
        <label className="field">
          <span>时区 UTC 偏移</span>
          <input value={utc} onChange={(e) => onUtcChange(e.target.value)} />
        </label>
      </div>
      <p className="muted" style={{ fontSize: '0.76rem', margin: '0.65rem 0 0', lineHeight: 1.55 }}>
        选择城市或区县后会自动填写经度和 UTC 偏移；有夏令时的地区会尽量按所选日期带出对应偏移。
      </p>
    </div>
  )
}

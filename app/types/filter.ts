export interface FilterConfig {
  filter_type: string
  is_required: boolean
  sort_order: number
}

export interface Brand {
  id: number
  name: string
  logo_url: string
}

export interface League {
  id: number
  name: string
  logo_url: string
}

export interface Team {
  id: number
  name: string
  league_id: number
  logo_url: string
}

export interface SurfaceType {
  id: number
  name: string
}

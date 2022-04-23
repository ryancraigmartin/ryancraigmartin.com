export type GA4EventType = CustomClickEvent | ClickEventName

export type CustomClickEvent = {
  action: ClickEventName
  buttonClicked?: boolean
  event_name?: string
  link_name: string
  link_url?: string
}

export type ClickEventName =
  | 'clicked_email'
  | 'clicked_github'
  | 'clicked_instagram'
  | 'clicked_linkedin'
  | 'clicked_namecheap'
  | 'clicked_phone'
  | 'clicked_resume'
  | 'clicked_spotify'
  | 'clicked_twitter'
  | 'clicked_website'
  | 'clicked_youtube'

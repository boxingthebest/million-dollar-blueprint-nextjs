declare module '@mailchimp/mailchimp_marketing' {
  interface Config {
    apiKey?: string
    accessToken?: string
    server?: string
  }

  interface SetListMemberBody {
    email_address: string
    status_if_new: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending'
    merge_fields?: Record<string, any>
    interests?: Record<string, boolean>
    language?: string
    vip?: boolean
    location?: {
      latitude: number
      longitude: number
    }
    marketing_permissions?: Array<{
      marketing_permission_id: string
      enabled: boolean
    }>
    ip_signup?: string
    timestamp_signup?: string
    ip_opt?: string
    timestamp_opt?: string
    tags?: string[]
  }

  interface ListMember {
    id: string
    email_address: string
    unique_email_id: string
    contact_id: string
    full_name: string
    web_id: number
    email_type: string
    status: string
    merge_fields: Record<string, any>
    stats: {
      avg_open_rate: number
      avg_click_rate: number
    }
    ip_signup: string
    timestamp_signup: string
    ip_opt: string
    timestamp_opt: string
    member_rating: number
    last_changed: string
    language: string
    vip: boolean
    email_client: string
    location: {
      latitude: number
      longitude: number
      gmtoff: number
      dstoff: number
      country_code: string
      timezone: string
    }
    tags: Array<{
      id: number
      name: string
    }>
  }

  interface CreateListMemberNoteBody {
    note: string
  }

  interface Lists {
    setListMember(
      listId: string,
      subscriberHash: string,
      body: SetListMemberBody
    ): Promise<ListMember>
    
    createListMemberNote(
      listId: string,
      subscriberHash: string,
      body: CreateListMemberNoteBody
    ): Promise<any>
  }

  interface MailchimpMarketing {
    lists: Lists
    setConfig(config: Config): void
  }

  const mailchimp: MailchimpMarketing
  export default mailchimp
}


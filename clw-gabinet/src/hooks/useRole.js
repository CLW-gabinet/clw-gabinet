import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useRole() {
  const [rola, setRola] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRole() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('rola')
        .eq('id', user.id)
        .single()

      setRola(data?.rola)
      setLoading(false)
    }

    fetchRole()
  }, [])

  return { 
    rola, 
    loading, 
    isAdmin: rola === 'admin',
    isLekarz: rola === 'lekarz'
  }
}
const supabase = useSupabaseClient()

const getGithubToken = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    return null
  }

  return data.session.provider_token
}

const token = await getGithubToken()

const octokit = new Octokit({
  auth: token
})

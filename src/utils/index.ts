import {useClient, useCurrentUser} from 'sanity'

export const GetUserRoles = () => {
  const user = useCurrentUser()
  const {roles} = user
  return roles
}
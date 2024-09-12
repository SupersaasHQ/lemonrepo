export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();

  if (!user.value?.admin && !loggedIn.value) {
    return navigateTo("/login");
  }
});

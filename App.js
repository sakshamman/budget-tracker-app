<Stack.Navigator>
  {!auth.currentUser ? (
    <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </>
  ) : (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add" component={BudgetEntryScreen} />
    </>
  )}
</Stack.Navigator>;

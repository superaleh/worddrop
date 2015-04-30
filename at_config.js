T9n.setLanguage("ru");

AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');
AccountsTemplates.addFields([
  {
    _id: "username",
    placeholder: {
      signUp: "минимум 5 знаков",
      signIn: " "
    },
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
    errStr: 'Должно быть минимум 5 знаков'
  }
]);
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  displayName: "password",
  placeholder: {
    signUp: "минимум 6 знаков"
  },
  required: true,
  minLength: 6,
  re: /.{6,}/,
  errStr: 'Должно быть минимум 6 знаков'
});


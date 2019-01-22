export const LOGIN = `
    mutation UserLogn($input: LoginInput!) {
      userLogin(input: $input) {
        payload {
          username,
          isStaff,
          isActive,
          isSuperuser,
          gender,
          mobile,
          id,
          email,
          department {
            id,
            departmentName
          }
        },
        token
      }
    }
`;
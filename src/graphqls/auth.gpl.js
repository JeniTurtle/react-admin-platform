export const LOGIN_GPL = `
    mutation ($input: LoginInput!) {
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

export const REFRESH_TOKEN_GPL = `
    mutation ($input: RefreshInput!){
      userRefreshToken(input: $input) {
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
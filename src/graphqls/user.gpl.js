export const QUERY_USER_LIST_GPL = `
    query ($first:Int,$last:Int,$before:String,$after:String,$username:String,$realName:String,$mobile:String,$email:String,$order:String,$gender:String,$isActive:Boolean) {
      userList (first:$first,last:$last,before:$before,after:$after,username:$username,realName:$realName,mobile:$mobile,email:$email,orderBy:$order,gender:$gender,isActive:$isActive) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            username
            realName
            isStaff
            mobile
            email
            gender
            isActive
            createTime
            department {
              id
              departmentName
            }
          }
          cursor
        }
      }
    }
`;

export const QUERY_USER_INFO_GPL = `
    query userUserInfo($id: ID!) {
      userUserInfo(id: $id) {
        id
        isSuperuser
        username
        realName
        gender
        mobile
        email
        isActive
        department {
          departmentName
        }
        createTime
      }
    }
`;

export const QUERY_USER_INFO_AND_GROUPS_GPL = `
    query userUserInfo($id: ID!) {
      userUserInfo(id: $id) {
        id
        isSuperuser
        username
        realName
        gender
        mobile
        email
        isActive
        department {
          id
          departmentName
        }
        groups {
          edges {
            node {
              id
              name
            }
          }
        }
        createTime
      }
      groupList {
        id
        name
      }
    }
`;

export const ADD_USER_GPL = `
    mutation registerUser($input: RegisterUserInput!) {
      userRegisterUser(input: $input) {
        payload {
          id
          username
          gender
          isActive
          mobile
          email
        }
      }
    }
`;

export const UPDATE_USER_INFO_GPL = `
    mutation updateUserInfo($input: UpdateUserInfoInput!) {
      userUpdateUserInfo(input: $input) {
        payload {
          id
          username
          gender
          isActive
          mobile
          email
        }
      }
    }
`;

export const RESET_USER_PASSWORD_GPL = `
    mutation resetPassword($input: ResetUserPasswordInput!) {
      userResetUserPassword(input: $input) {
        payload {
          id
          username
          gender
          isActive
          mobile
          email
        }
      }
    }
`;

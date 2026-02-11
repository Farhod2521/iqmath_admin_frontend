import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { actionGetMe, actionLogin, actionSapLogin } from './authActions'
import { LoginResponseType, UserMeType } from '@/http'
import { clearAuth, getAuth, getIsStaff, getTokenAccess, setAuth } from '@/utils/token'

interface AuthState {
  isAuthenticated: boolean
  isStaff: boolean
  auth: LoginResponseType | string
  loading: boolean
  error: string | null
  errorUser: string | null
  user?: UserMeType
  loadingUser: boolean
  permissions: string[]
}

const initialState: AuthState = {
  isAuthenticated: !!getTokenAccess(),
  isStaff: !!getIsStaff(),
  auth: getAuth(),
  loading: false,
  user: undefined,
  error: null,
  loadingUser: false,
  errorUser: null,
  permissions: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.isStaff = false
      state.auth = ''
      clearAuth()
    },
    setAuthUser: (state, action) => {
      state.auth = action.payload
      state.isStaff = action.payload.is_staff
      setAuth(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(actionLogin.fulfilled, (state, action: PayloadAction<LoginResponseType>) => {
        state.isAuthenticated = true
        state.isStaff = action.payload.is_staff
        state.auth = action.payload
        state.loading = false
      })
      .addCase(actionLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(actionSapLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(actionSapLogin.fulfilled, (state, action: PayloadAction<LoginResponseType>) => {
        state.isAuthenticated = true
        state.isStaff = action.payload.is_staff
        state.auth = action.payload
        state.loading = false
      })
      .addCase(actionSapLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(actionGetMe.pending, (state) => {
        state.loadingUser = true
      })
      .addCase(actionGetMe.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
      })
      .addCase(actionGetMe.fulfilled, (state, action: PayloadAction<UserMeType>) => {
        state.user = action.payload
        const per = action.payload.position.permissionsList.map((i) => i.code)
        state.loadingUser = false
        state.permissions = per
      })
  }
})

export const { logout, setAuthUser } = authSlice.actions

export const selectUserPermission = (state: { auth: AuthState }) => state.auth.permissions
export const selectUserLoading = (state: { auth: AuthState }) => state.auth.loadingUser
export const selectUserMe = (state: { auth: AuthState }) => state.auth.user
export const selectUserAuth = (state: { auth: { auth: LoginResponseType | string } }) => state.auth.auth
export const selectIsAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated
export const selectIsStaff = (state: { auth: { isStaff: boolean } }) => state.auth.isStaff

export default authSlice.reducer

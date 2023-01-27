import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: [],
  successfully: null,
  users: [],
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  login: localStorage.getItem("login"),
  user: null,
};

export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ login, password, image, cash }, thunkAPI) => {
    try {
      const res = await fetch("users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password, image, cash }),
      });
      const user = await res.json();

      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      localStorage.setItem("token", user.token);
      localStorage.setItem("id", user.id);
      localStorage.setItem("login", user.login);

      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "edit/user",
  async (
    { id, login, password, name, surname, patronymic, banned, image, role },
    thunkAPI
  ) => {
    try {
      const res = await fetch(`/users/edituser/${id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          login,
          password,
          name,
          surname,
          patronymic,
          banned,
          image,
          role,
        }),
      });
      const user = await res.json();
      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authSignUp = createAsyncThunk(
  "auth/signUp",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("users/registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const user = await res.json();
      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchUser = createAsyncThunk("fetch/user", async (_, thunkAPI) => {
  try {
    const res = await fetch(`/users`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().users.token}`,
      },
    });
    const users = await res.json();
    if (users.error) {
      return thunkAPI.rejectWithValue(users.error);
    }
    return thunkAPI.fulfillWithValue(users);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Поднять бабло в AZINO ООО
export const BalansUp = createAsyncThunk(
  "UpBalance/user",
  async ({ id, balance }, thunkAPI) => {
    try {
      const res = await fetch(`/users/upbalance/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().users.token}`,
        },

        body: JSON.stringify({ cash: balance }),
      });
      const user = await res.json();

      if (user.error) {
        return thunkAPI.rejectWithValue(user.error);
      }
      return thunkAPI.fulfillWithValue(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })

      // REGISTER
      .addCase(authSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successfully = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successfully = null;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.successfully = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = null;
        state.error = false;
      })
      //UPBALANce
      .addCase(BalansUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(BalansUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(BalansUp.fulfilled, (state, action) => {
        state.user.cash = action.payload;
        state.loading = false;
        state.error = null;
      })

      //FETCH USERS
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        action.payload.map((item) => {
          if (item._id === localStorage.getItem("id")) {
            state.users = item;
          }
        });
      });
  },
});

export default usersSlice.reducer;

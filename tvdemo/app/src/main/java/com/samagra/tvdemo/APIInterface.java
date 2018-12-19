package com.samagra.tvdemo;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface APIInterface {
    @GET("events/")
    Call<List<User>> getUsers();
}

package com.samagra.tvdemo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TestActivity extends Activity {

    APIInterface apiService;
    public static final String BASE_URL = "http://shaddygarg.pythonanywhere.com/";
    ArrayList<User> users = new ArrayList<>();
    ArrayList<String> titles = new ArrayList<>();
    ArrayList<String> studios = new ArrayList<>();
    ArrayList<String> urls = new ArrayList<>();
    ProgressBar progressBar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        progressBar = findViewById(R.id.progress_bar);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        apiService =
                retrofit.create(APIInterface.class);
        Call<List<User>> call = apiService.getUsers();
        call.enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                Log.e("In Main Fragment", String.valueOf(response.code()));
                users = (ArrayList<User>) response.body();
                Log.e("Finally",users.toString());
                Intent intent = new Intent(TestActivity.this,MainActivity.class);
                setLiveStreams();
                Log.e("TEST ACTIVITY",titles.toString());
                Log.e("TEST ACTIVITY",studios.toString());
                Log.e("TEST ACTIVITY",urls.toString());
                progressBar.setVisibility(View.GONE);
                MovieList.setup(titles,studios,urls);
                startActivity(intent);
                Log.e("TESTING ACTIVITY","Intent Done");
                finish();
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {

            }
        });

    }

    private void setLiveStreams(){
        Log.e("In function",users.toString());
        for (User user:
                users) {
            titles.add(user.getName());
            studios.add(user.getUsername());
            Log.d("TEST ACTIVITY",user.getLink());
            urls.add(user.getLink());
        }
    }
}

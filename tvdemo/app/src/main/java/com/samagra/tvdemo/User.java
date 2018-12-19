package com.samagra.tvdemo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class User{

        @SerializedName("id")
        @Expose
        private Integer id;
        @SerializedName("username")
        @Expose
        private String username;
        @SerializedName("link")
        @Expose
        private String link;
        @SerializedName("name")
        @Expose
        private String name;
        @SerializedName("current_live")
        @Expose
        private Boolean currentLive;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getLink() {
            return link;
        }

        public void setLink(String link) {
            this.link = link;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Boolean getCurrentLive() {
            return currentLive;
        }

        public void setCurrentLive(Boolean currentLive) {
            this.currentLive = currentLive;
        }
}

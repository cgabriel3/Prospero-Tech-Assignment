package service;

import model.Response;
import model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserManagementService {

    public Response<User> create(String email, String password){
        User user = new User();
        String status = "";
        String error = "";

        if(email.equals("") || email == null){
            status = "failed";
            error = "email empty";
        }
        if(password.equals("") || password == null){
            status = "failed";
            error = "password empty";
        }
        
        Response<User> response = new Response<>();
        response.setStatus(status);
        response.setError(error);
        response.setResult(user);

        return response;
    }

    public Response<User> replace(String email, String password, String role){
        List<User> userList = new ArrayList<>();
        Optional<User> u = userList.stream().filter(user -> user.getEmail().equals(email)).findFirst();

        String status = "";
        String error ="";

        if(u != null){
            status = "success replace";
            u.get().setEmail(email);
            u.get().setPassword(password);
            u.get().setRole(role);
        }
        status ="failed";
        error ="failed to replace";

        Response<User> response = new Response<>();
        response.setStatus(status);
        response.setError(error);
        response.setResult(u.get());

        return response;

    }

    public Response<User> update(String email, String password, String role){
        List<User> userList = new ArrayList<>();
        Optional<User> u = userList.stream().filter(user -> user.getEmail().equals(email)).findFirst();

        String status = "";
        String error ="";

        if(u != null){
            status = "success update";
            u.get().setEmail(email);
            u.get().setPassword(password);
            u.get().setRole(role);
        }
        status ="failed";
        error ="failed to update";

        Response<User> response = new Response<>();
        response.setStatus(status);
        response.setError(error);
        response.setResult(u.get());

        return response;

    }

    public Response<User> delete(String email, String password, String role){
        List<User> userList = new ArrayList<>();
        Optional<User> u = userList.stream().filter(user -> user.getEmail().equals(email)).findFirst();

        String status = "";
        String error ="";

        if(u != null){
            status = "success delete";
            userList.remove(u);
        }
        status ="failed";
        error ="failed to delete";

        Response<User> response = new Response<>();
        response.setStatus(status);
        response.setError(error);

        return response;

    }
}

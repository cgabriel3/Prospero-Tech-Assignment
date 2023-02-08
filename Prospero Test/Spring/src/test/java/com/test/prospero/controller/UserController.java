import com.test.prospero.model.User;
import com.test.prospero.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //The function receives a GET request, processes it and gives back a list of User as a response.
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> Users = userService.getUsers();
        return new ResponseEntity<>(Users, HttpStatus.OK);
    }
    //The function receives a GET request, processes it, and gives back a list of User as a response.
    @GetMapping({"/{UserId}"})
    public ResponseEntity<User> getUser(@PathVariable Long UserId) {
        return new ResponseEntity<>(userService.getUserById(UserId), HttpStatus.OK);
    }
    //The function receives a POST request, processes it, creates a new User and saves it to the database, and returns a resource link to the created User.           @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User User) {
        User User1 = userService.insert(User);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("User", "/api/v1/User/" + User1.getId().toString());
        return new ResponseEntity<>(User1, httpHeaders, HttpStatus.CREATED);
    }
    //The function receives a PUT request, updates the User with the specified Id and returns the updated User
    @PutMapping({"/{UserId}"})
    public ResponseEntity<User> updateUser(@PathVariable("UserId") Long UserId, @RequestBody User User) {
        userService.updateUser(UserId, User);
        return new ResponseEntity<>(userService.getUserById(UserId), HttpStatus.OK);
    }
    //The function receives a DELETE request, deletes the User with the specified Id.
    @DeleteMapping({"/{UserId}"})
    public ResponseEntity<User> deleteUser(@PathVariable("UserId") Long UserId) {
        userService.deleteUser(UserId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
import java.util.List;

public interface UserService {
    List<User> getUser();

    Todo getUserById(Long id);

    Todo insert(User user);

    void updateUser(Long id, User user);

    void deleteUser(Long userId);
}
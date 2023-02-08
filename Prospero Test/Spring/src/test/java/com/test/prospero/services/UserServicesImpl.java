import com.test.prospero.model.User;
import com.test.prospero.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getUsers() {
        List<User> Users = new ArrayList<>();
        userRepository.findAll().forEach(Users::add);
        return Users;
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public User insert(User User) {
        return userRepository.save(User);
    }

    @Override
    public void updateUser(Long id, User User) {
        User UserFromDb = userRepository.findById(id).get();
        System.out.println(UserFromDb.toString());
        UserFromDb.setUserStatus(User.getUserStatus());
        UserFromDb.setDescription(User.getDescription());
        UserFromDb.setTitle(User.getTitle());
        userRepository.save(UserFromDb);
    }

    @Override
    public void deleteUser(Long UserId) {
        userRepository.deleteById(UserId);
    }
}
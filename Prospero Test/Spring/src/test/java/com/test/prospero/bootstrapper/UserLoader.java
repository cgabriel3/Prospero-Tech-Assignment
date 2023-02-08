import com.test.prospero.model.UserType;
import com.test.prospero.model.UserRole;
import com.test.prospero.model.User;
import com.test.prospero.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserLoader implements CommandLineRunner {
    public final UserRepository userRepository;

    public UserLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        loadUsers();
    }

    private void loadUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(
                    User.builder()
                            .email("test_user@email.com")
                            .password("password123")
                            .userType(UserType.User)
                            .userRole(UserRole.Checker)
                            .build()
            );
            userRepository.save(
                    User.builder()
                            .email("test_admin@email.com")
                            .password("admin1234")
                            .userType(UserType.Admin)
                            .userRole(UserRole.Admin)
                            .build()
            );
            System.out.println("Test User Loaded");
        }
    }
}
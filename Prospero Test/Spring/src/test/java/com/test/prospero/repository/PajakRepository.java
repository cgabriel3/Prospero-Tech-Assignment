import com.test.prospero.model.Pajak;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PajakRepository extends CrudRepository<Pajak, Long> {
}
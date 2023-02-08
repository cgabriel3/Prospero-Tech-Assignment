import com.test.prospero.model.Pajak;
import com.test.prospero.repository.PajakRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PajakServiceImpl implements PajakService {
    PajakRepository pajakRepository;

    public PajakServiceImpl(PajakRepository pajakRepository) {
        this.pajakRepository = pajakRepository;
    }

    @Override
    public List<Pajak> getPajaks() {
        List<Pajak> Pajaks = new ArrayList<>();
        pajakRepository.findAll().forEach(Pajaks::add);
        return Pajaks;
    }

    @Override
    public Pajak getPajakById(Long id) {
        return pajakRepository.findById(id).get();
    }

    @Override
    public Pajak insert(Pajak pajak) {
        return pajakRepository.save(pajak);
    }

    @Override
    public void updatePajak(Long id, Pajak pajak) {
        Pajak PajakFromDb = pajakRepository.findById(id).get();
        System.out.println(PajakFromDb.toString());
        PajakFromDb.setPajakStatus(pajak.getPajakStatus());
        PajakFromDb.setDescription(pajak.getDescription());
        PajakFromDb.setTitle(pajak.getTitle());
        pajakRepository.save(PajakFromDb);
    }

    @Override
    public void deletePajak(Long pajakId) {
        pajakRepository.deleteById(pajakId);
    }
}
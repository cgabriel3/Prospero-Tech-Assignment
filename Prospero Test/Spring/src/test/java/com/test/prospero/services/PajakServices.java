import java.util.List;

public interface PajakService {
    List<Pajak> getPajak();

    Todo getPajakById(Long id);

    Todo insert(Pajak pajak);

    void updatePajak(Long id, Pajak pajak);

    void deletePajak(Long pajakId);
}
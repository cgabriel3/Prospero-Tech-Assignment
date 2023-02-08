import com.test.prospero.model.Pajak;
import com.test.prospero.services.PajakService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pajak")
public class PajakController {
    PajakService pajakService;

    public PajakController(PajakService pajakService) {
        this.pajakService = pajakService;
    }

    //The function receives a GET request, processes it and gives back a list of Pajak as a response.
    @GetMapping
    public ResponseEntity<List<Pajak>> getAllPajaks() {
        List<Pajak> pajaks = pajakService.getPajaks();
        return new ResponseEntity<>(pajaks, HttpStatus.OK);
    }
    //The function receives a GET request, processes it, and gives back a list of Pajak as a response.
    @GetMapping({"/{PajakId}"})
    public ResponseEntity<Pajak> getPajak(@PathVariable Long pajakId) {
        return new ResponseEntity<>(PajakService.getPajakById(pajakId), HttpStatus.OK);
    }
    //The function receives a POST request, processes it, creates a new Pajak and saves it to the database, and returns a resource link to the created Pajak.           @PostMapping
    public ResponseEntity<Pajak> savePajak(@RequestBody Pajak pajak) {
        Pajak pajak1 = PajakService.insert(pajak);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Pajak", "/api/v1/Pajak/" + pajak1.getId().toString());
        return new ResponseEntity<>(pajak1, httpHeaders, HttpStatus.CREATED);
    }
    //The function receives a PUT request, updates the Pajak with the specified Id and returns the updated Pajak
    @PutMapping({"/{PajakId}"})
    public ResponseEntity<Pajak> updatePajak(@PathVariable("PajakId") Long pajakId, @RequestBody Pajak pajak) {
        PajakService.updatePajak(pajakId, pajak);
        return new ResponseEntity<>(PajakService.getPajakById(pajakId), HttpStatus.OK);
    }
    //The function receives a DELETE request, deletes the Pajak with the specified Id.
    @DeleteMapping({"/{PajakId}"})
    public ResponseEntity<Pajak> deletePajak(@PathVariable("PajakId") Long pajakId) {
        PajakService.deletePajak(pajakId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
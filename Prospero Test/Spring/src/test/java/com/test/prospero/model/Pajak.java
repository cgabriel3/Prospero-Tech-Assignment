import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "pajak_report")
public class Pajak{
    @Id
    @GeneratedValue
    @Column(updatable= false, nullable= false)
    Long Id;
    @Column
    Long noResi;
    @Column 
    Date tanggalPembuatan;
    @Column
    String status;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;

    @CreationTimestamp
    @Column(updatable = false)
    Timestamp dateCreated;
    @UpdateTimestamp
    Timestamp lastModified;
}
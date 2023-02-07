package service;

import model.Response;
import model.TaxFile;

import java.util.Date;

public class TaxReportingService {

    public Response<TaxFile> inputTaxFile(String nomorResi, Date createdAt,String taxStatus){

        TaxFile taxFile = new TaxFile();
        String status ="";
        String error = "";

        if(nomorResi.equals("") || nomorResi == null){
            status = "failed";
            error = "nomorResi empty";
        }
        if(taxStatus.equals("") || taxStatus == null){
            status = "failed";
            error = "taxStatus empty";
        }
        if(createdAt.equals("") || createdAt == null){
            status = "failed";
            error = "createdAt empty";
        }

        Response<TaxFile> response = new Response<>();
        response.setResult(taxFile);
        response.setStatus(status);
        response.setError(error);

        return response;
    }
}

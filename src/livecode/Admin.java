/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package livecode;

/**
 *
 * @author Fakhri Hassan
 */
public class Admin extends Role {

    public Admin(String email, String password) {
        super(email, password);
        this.role = "admin";
    }

    public void adminCreateTax(Tax tax, String date, String status) {
        tax.createTax(date, status, this.role, "null");
    } 
}

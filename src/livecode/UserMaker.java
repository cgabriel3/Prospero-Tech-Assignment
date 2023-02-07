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
public class UserMaker extends Role {

    public UserMaker(String email, String password) {
        super(email, password);
        this.role = "user-maker";
    }
    
    public void checkTax(Tax tax) {
        System.out.format(
                "{id: %d, date: %s, status: %s}",
                tax.getId(), tax.getDate(), tax.getStatus()
        );
    }
    
    public void makerCreateTax(Tax tax, String date, String status) {
        String idStr = Integer.toString(tax.count);
        tax.tasks[tax.count][0] = idStr;
        tax.tasks[tax.count][1] = date;
        tax.tasks[tax.count][2] = status;
        tax.tasks[tax.count][3] = this.role;
        tax.tasks[tax.count][4] = "null";
        tax.count++;
    }
    
}

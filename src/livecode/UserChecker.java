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
public class UserChecker extends Role {

    public UserChecker(String email, String password) {
        super(email, password);
        this.role = "user-checker";
    }
    
    public void setStatus(Tax tax, int id, String status) {
        tax.tasks[id][2] = status;
        tax.tasks[id][4] = this.role;
    }
    
    public void getTax(Tax tax) {
        tax.display();
    }
    
}

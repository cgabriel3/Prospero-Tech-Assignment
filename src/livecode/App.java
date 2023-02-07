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
public class App {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        Admin admin = new Admin("admin1", "password");
        Tax tax = new Tax();
        
        UserMaker user_maker = new UserMaker("maker1", "password");
        UserChecker user_checker = new UserChecker("checker1", "password");
        UserApprover user_approver = new UserApprover("approver1", "password");
        
        admin.adminCreateTax(tax, "01-02-2022", "approve");
        admin.adminCreateTax(tax, "07-04-2022", "waiting");
        admin.adminCreateTax(tax, "09-06-2022", "waiting");
        admin.adminCreateTax(tax, "12-09-2022", "waiting");
        
//        user_checker.getTax(tax);

        user_maker.makerCreateTax(tax, "01-01-2022", "waiting");
        user_checker.setStatus(tax, 2, "approve");
        user_checker.setStatus(tax, 3, "reject");
        
        user_approver.getTax(tax);
        
        
//        tax.display();
        
    }
    
}

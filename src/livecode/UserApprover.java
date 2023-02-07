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
public class UserApprover extends Role {

    public UserApprover(String email, String password) {
        super(email, password);
        this.role = "user-approver";
    }

    public void getTax(Tax tax) {
        for (int i = 0; i < tax.count; i++) {
            if ("approve".equals(tax.tasks[i][2]) && "user-checker".equals(tax.tasks[i][4])) {
                System.out.format(
                    "{id: %s, date: %s, status: %s, created_by: %s, updated_by: %s}\n",
                    tax.tasks[i][0], tax.tasks[i][1], tax.tasks[i][2],
                    tax.tasks[i][3], tax.tasks[i][4]
                );
            }
        }
    }
}

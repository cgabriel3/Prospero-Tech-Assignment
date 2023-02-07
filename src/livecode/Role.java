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
public class Role {
    public String email;
    public String password;
    public String role;
    
    Role(String email, String password) {
        this.email = email;
        this.password = password;
    }
}

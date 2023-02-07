/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package livecode;

import java.util.*;

/**
 *
 * @author Fakhri Hassan
 */
public class Tax {
    private int id;
    private String date;
    private String status;
    public int count = 0;
    
//    public List<String> list_tax = new ArrayList<String>();
    
    String[][] tasks = new String[10][5];
    
    public void createTax(
            String date, 
            String status, 
            String created_by, 
            String updated_by) 
    {
        String idStr = Integer.toString(this.count);
        
        this.tasks[this.count][0] = idStr;
        this.tasks[this.count][1] = date;
        this.tasks[this.count][2] = status;
        this.tasks[this.count][3] = created_by;
        this.tasks[this.count][4] = updated_by;
        this.count++;
    }
    
    public void updateTax(Tax tax, int id, String status) {
        tax.tasks[id][2] = status;
    }
    
    public void display() {
        for (int i = 0; i < this.count; i++) {
            System.out.format(
                    "{id: %s, date: %s, status: %s, created_by: %s, updated_by: %s}\n",
                    tasks[i][0], tasks[i][1], tasks[i][2], 
                    tasks[i][3], tasks[i][4]
            );
        }
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public int getId() {
        return this.id;
    }
    
    public String getDate() {
        return this.date;
    }
    
    public String getStatus() {
        return this.status;
    }
}

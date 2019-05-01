package com.zjp.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

/***************************************************************************************
 * Project:        ocm-service
 * <p>
 * Copyright ©
 * <p>
 * **************************************************************************************
 * <p>
 * Header Name: WellJoint
 * <p>
 * Description:
 * <p>
 * Revision History:
 * Modification
 * Author                  Date(MM/DD/YYYY)             JiraID            Description of Changes
 * ----------------      ------------------------       -------------     ----------------------
 * zhanglu               2017/8/9-14:18
 ****************************************************************************************/

public class BaseEntity implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "select replace(uuid(), '-', '')")
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

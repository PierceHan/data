package com.zjp.mapper;

import com.zjp.model.PersonEntity;
import com.zjp.utils.MyMapper;

/**
 * Created by hanguoan on 2019/5/5.
 */
public interface UserMapper extends MyMapper<PersonEntity> {
    int deleteByName(String id);

    int updatePerson(PersonEntity personEntity);

    PersonEntity selectSinglePerson(String id);
}



package com.zjp.controller;

import com.zjp.model.HotelBasicInfo;
import com.zjp.model.PersonEntity;
import com.zjp.model.en.CodeEnum;
import com.zjp.model.web.ApiData;
import com.zjp.model.web.ApiResponse;
import com.zjp.service.HotelInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * Created by zjp on 2019/5/03.
 */
@Api(tags = "用户信息管理")
@RestController
public class PersonController {

    @Autowired
    private HotelInfoService hotelInfoService;

    private <T> ApiResponse<T> createResult(T t) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(CodeEnum.A0001.getCode());
        apiResponse.setMsg("success");
        apiResponse.setResult(t);
        return apiResponse;
    }

    @ApiOperation(value = "新建用户信息")
    @RequestMapping(value = "/person/edit", method = RequestMethod.POST)
    public ApiResponse createPerson(@RequestParam(required = false) String name,
                                   @RequestParam(required = false) String pass,
                                   @RequestParam(required = false) String realName,
                                   @RequestParam(required = false) String email,
                                   @RequestParam(required = false) String permission,
                                   @RequestParam(required = false) String dept
                                  ) throws ParseException {
        PersonEntity personEntity=new PersonEntity();
        personEntity.setName(name);
        personEntity.setPass(pass);
        personEntity.setRealName(realName);
        personEntity.setEmail(email);
        personEntity.setPermission(permission);
        personEntity.setDept(dept);

        int result = hotelInfoService.createPerson(personEntity);
        if (result == 1) {
            return createResult(result);
        }
        return createResult(null);
    }

    @ApiOperation(value = "删除用户信息")
    @RequestMapping(value = "/person/delete/{id}", method = RequestMethod.POST)
    public ApiResponse deletePerson(@PathVariable String id) {
        int result = hotelInfoService.deletePerson(id);
        if (result == 1) {
            return createResult(result);
        }
        return createResult(null);
    }

    @ApiOperation(value = "修改用户信息")
    @RequestMapping(value = "/person/update", method = RequestMethod.POST)
    public ApiResponse updatePerson(@RequestParam(required = false) String name,
                                   @RequestParam(required = false) String pass,
                                   @RequestParam(required = false) String realName,
                                   @RequestParam(required = false) String email,
                                   @RequestParam(required = false) String permission,
                                   @RequestParam(required = false) String dept) throws ParseException {
        PersonEntity personEntity=new PersonEntity();
        personEntity.setName(name);
        personEntity.setPass(pass);
        personEntity.setRealName(realName);
        personEntity.setEmail(email);
        personEntity.setPermission(permission);
        personEntity.setDept(dept);

        int result = hotelInfoService.updatePerson(personEntity);
        if (result == 1) {
            return createResult(result);
        }
        return createResult(null);
    }

    @ApiOperation(value = "查找用户信息")
    @RequestMapping(value = "/person/single", method = RequestMethod.POST)
    public ApiResponse selectSinglePerson(
            @RequestParam(required = false) String ID
    ) throws ParseException {

        PersonEntity result = hotelInfoService.selectSinglePerson(ID);
        return createResult(result);
    }

    @ApiOperation(value = "加载所有用户信息")
    @RequestMapping(value = "/person/list", method = RequestMethod.POST)
    public ApiResponse selectPersonAll(  @RequestParam(required = false) String ID) {
        List<PersonEntity> result = hotelInfoService.selectPersonAll(ID);
        return createResult(result);
    }

}

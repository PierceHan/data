package com.zjp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by zjp on 2016/7/15.
 */
@Controller
public class HomeController {
    private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

    @RequestMapping(path = {"/", "/index"}, method = {RequestMethod.GET, RequestMethod.POST})
    public String index(Model model,
                        @RequestParam(value = "pop", defaultValue = "0") int pop) {
//        model.addAttribute("vos", getQuestions(0, 0, 10));
        return "FinanceHtl";
    }

    @RequestMapping(path = {"/indde"}, method = {RequestMethod.GET, RequestMethod.POST})
    public String indexssss(Model model, @RequestParam(value = "pop", defaultValue = "0") int pop){
        return "warnpricegreylist";
    }

    @RequestMapping(path = {"/mainframe"}, method = {RequestMethod.GET, RequestMethod.POST})
    public String indes(Model model, @RequestParam(value = "pop", defaultValue = "0") int pop){
        return "mainFrame";
    }


    @RequestMapping(path = {"/home"}, method = {RequestMethod.GET, RequestMethod.POST})
    public String indess(Model model, @RequestParam(value = "pop", defaultValue = "0") int pop){
        return "index";
    }


}

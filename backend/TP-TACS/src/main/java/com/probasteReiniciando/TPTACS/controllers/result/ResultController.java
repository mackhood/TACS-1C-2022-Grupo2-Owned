package com.probasteReiniciando.TPTACS.controllers.result;

import com.probasteReiniciando.TPTACS.config.ModelMapperTacs;
import com.probasteReiniciando.TPTACS.domain.Result;
import com.probasteReiniciando.TPTACS.dto.ResultDto;
import com.probasteReiniciando.TPTACS.services.user.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Slf4j
@RequestMapping({ "/results" })
public class ResultController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapperTacs modelMapper;

    @GetMapping(path= "/user",produces = "application/json")
    public List<ResultDto> getResults(@RequestAttribute(name="userAttributeName") String userLoggedIn) {
        return modelMapper.mapList(userService.getResultsByUser(userLoggedIn),ResultDto.class);
    }

    @PutMapping(path="/{resultId}", produces = "application/json")
    public List<Result> modifyResult(@PathVariable int id, @PathVariable int resultId, @RequestBody ResultDto result,@RequestAttribute(name="userAttributeName") String userLoggedIn) {
        return null;
    }

    @PostMapping(produces = "application/json")
    public ResultDto createResult(@RequestAttribute(name="userAttributeName") String userLoggedIn, @RequestBody ResultDto result) {
        return modelMapper.map(userService.createResult(userLoggedIn,result),ResultDto.class);
    }
}

package com.probasteReiniciando.TPTACS.dto;

import com.probasteReiniciando.TPTACS.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@AllArgsConstructor
@Data
@Builder
public class ResultDto {

    private UserDto user;

    private Integer points;

    private String language;

    private LocalDate date;

}
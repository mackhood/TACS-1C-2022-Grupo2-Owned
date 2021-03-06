package com.probasteReiniciando.TPTACS.controllers.helper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.probasteReiniciando.TPTACS.domain.Language;
import com.probasteReiniciando.TPTACS.dto.HelpDto;
import com.probasteReiniciando.TPTACS.dto.WordDto;
import com.probasteReiniciando.TPTACS.services.helper.HelperService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.*;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters  = false)
public class HelperControllerTest {

    @MockBean
    HelperService helperService;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    public void helperTest() throws Exception {

        List<WordDto> wordsTest = new ArrayList<>();
        wordsTest.add(WordDto.builder().phrase("test").build());

        when(helperService.readWordsInMemory(Language.ENGLISH)).thenReturn(new ArrayList<>());
        when(helperService.wordSearch(HelpDto.builder().build())).thenReturn(wordsTest);

        String object = objectMapper.writeValueAsString(HelpDto.builder().build());
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/help")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(object);


        MvcResult  result = mockMvc.perform(requestBuilder)
                            .andExpect(status().isOk())
                            .andReturn();

        JsonNode jsonNode = objectMapper.readTree(result.getResponse().getContentAsString());
        JsonNode data = jsonNode.get("response");
        WordDto[] words = objectMapper.treeToValue(data, WordDto[].class);
        List<WordDto> wordDtoList = new ArrayList<>(Arrays.asList(words));
        Assert.assertEquals(List.of(WordDto.builder().phrase("test").build()),wordDtoList);
        verify(helperService).wordSearch(HelpDto.builder().build());

    }
}

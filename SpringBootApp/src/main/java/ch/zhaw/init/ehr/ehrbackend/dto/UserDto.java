package ch.zhaw.init.ehr.ehrbackend.dto;

import ch.zhaw.init.ehr.ehrbackend.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private UserRole role;
}

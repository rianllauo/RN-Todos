import React from "react";
import { Box, Stack, Text } from "native-base";

const BadgeCategory = ({ data }) => {
    return (
        <Box
            bg={data.color}
            px="3"
            py={"1"}
            m={"1.5"}
            borderRadius="md"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Text color={"white"} fontWeight="medium">
                {data.name_category}
            </Text>
        </Box>
    );
};

export default BadgeCategory;

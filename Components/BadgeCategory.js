import React from "react";
import { Box, Stack, Text } from "native-base";

const BadgeCategory = ({ data }) => {
    return (
        <Box
            bg={data.color}
            margin="2"
            px="2"
            py={"1.5"}
            w="24"
            borderRadius={"md"}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Text color={"white"} fontWeight="bold">
                {data.name_category}
            </Text>
        </Box>
    );
};

export default BadgeCategory;

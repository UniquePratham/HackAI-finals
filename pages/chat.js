// pages/chat.js
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { Box, Flex, Input, Button, Text, VStack, Spinner } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm ChatMate. Ask me anything about your order, refund or account." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I could not answer that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong reaching the assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Head>
        <title>Chat - ChatMate</title>
      </Head>
      <Navbar />

      <Flex flex="1" justify="center" px={4} py={10}>
        <Box w="full" maxW="760px">
          <VStack align="stretch" spacing={4}>
            {messages.map((m, i) => (
              <Box
                key={i}
                alignSelf={m.role === "user" ? "flex-end" : "flex-start"}
                bg={m.role === "user" ? "purple.500" : "gray.700"}
                color="white"
                px={4}
                py={3}
                borderRadius="lg"
                maxW="80%"
              >
                <Text whiteSpace="pre-wrap">{m.content}</Text>
              </Box>
            ))}
            {loading && <Spinner color="purple.400" />}
            <div ref={bottomRef} />
          </VStack>
        </Box>
      </Flex>

      <Box as="form" onSubmit={send} px={4} pb={8}>
        <Flex maxW="760px" mx="auto" gap={3}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            bg="gray.800"
            color="white"
            border="none"
          />
          <Button type="submit" colorScheme="purple" isLoading={loading}>
            Send
          </Button>
        </Flex>
      </Box>

      <Footer />
    </Box>
  );
};

export default ChatPage;
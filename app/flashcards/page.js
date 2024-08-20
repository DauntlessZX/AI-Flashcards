"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { CollectionReference, doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust the import path according to your project structure

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
     async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcardSets || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcardSets: [] });
      }
    }
    getFlashcards();
  }, [user]);

  const handleCardClick = (setName) => {
    router.push(`/flashcard?id=${setName}`);
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <Typography variant="h5">
        Please sign in to view your flashcards.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Flashcard Sets
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcardSet, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => handleCardClick(flashcardSet.name)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {flashcardSet.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No flashcard sets found.</Typography>
        )}
      </Grid>
    </Container>
  );
}

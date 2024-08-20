'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseConfig' // Adjust this path according to your project structure

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const searchParams = useSearchParams()
  const search = searchParams.get('id')

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return

      const colRef = collection(doc(collection(db, 'users'), user.id), search)
      const docs = await getDocs(colRef)
      const flashcards = []
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() })
      })
      setFlashcards(flashcards)
    }
    getFlashcard()
  }, [search, user])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (!isLoaded || !isSignedIn) {
    return <Typography variant="h5">Please sign in to view your flashcards.</Typography>
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Flashcards
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box
                    sx={{
                      perspective: '1000px',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        transition: 'transform 0.8s',
                        transformStyle: 'preserve-3d',
                        transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <Typography variant="h5" component="div">
                          {flashcard.front}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <Typography variant="h5" component="div">
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

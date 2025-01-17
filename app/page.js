import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  return (
    
    <Container maxWidth = "lg">
      <Head>
        <title>FLashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
  <Toolbar>
    <Typography variant="h6" style={{flexGrow: 1}}>
      Flashcard SaaS
    </Typography>
    <SignedOut>
      <Button color="inherit" href="/sign-in">Login</Button>
      <Button color="inherit" href="/sign-up">Sign Up</Button>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </Toolbar>
</AppBar>

<Box sx={{textAlign: 'center', my: 4}}>
  <Typography variant="h2" component="h1" gutterBottom>
    Welcome to Flashcard SaaS
  </Typography>
  <Typography variant="h5" component="h2" gutterBottom>
    The easiest way to create flashcards from your text.
  </Typography>
  <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
    Get Started
  </Button>
  <Button variant="outlined" color="primary" sx={{mt: 2}}>
    Learn More
  </Button>
</Box>

<Box sx={{my: 6}}>
  <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} sm={4}>
      <Typography variant="h6" gutterBottom>Easy to use</Typography>
      <Typography>
      {' '}
        Just paste your text and get flashcards in seconds.
      </Typography>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
      <Typography>
      {' '}
        Just paste your text and get flashcards in seconds.
      </Typography>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Typography variant="h6" gutterBottom>Easy Accessibility</Typography>
      <Typography>
        {' '}
        Just paste your text and get flashcards in seconds.
      </Typography>
    </Grid>

  </Grid>
</Box>

<Box sx={{my: 6, textAlign: 'center'}}>
  <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
  <Grid container spacing={4} justifyContent="center">

    <Grid item xs={12} sm={4}>
    <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
      <Typography variant="h6" gutterBottom>Basic</Typography>
      <Typography variant="h4" gutterBottom>$5 / Month</Typography>
      <Typography>
        {' '}
        Access to basic flashcard features and limited storage.
      </Typography>
      <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
        Get Started
      </Button>
    </Box>
    </Grid>

    <Grid item xs={12} sm={4}>
    <Box sx={{p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2}}>
      <Typography variant="h6" gutterBottom>Pro</Typography>
      <Typography variant="h4" gutterBottom>$10 / Month</Typography>
      <Typography>
        {' '}
        Access to unlimited flashcards and unlimited storage.
      </Typography>
      <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
        Choose Pro
      </Button>
    </Box>
    </Grid>

  </Grid>
</Box>

    </Container>
  );
}

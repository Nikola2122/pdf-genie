import inngest.fast_api
from dotenv import load_dotenv
import logging
import os
import datetime
from inngest.experimental import ai
from fastapi import FastAPI


app = FastAPI()

inngest_client = inngest.Inngest(

)
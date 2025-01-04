import json
import random


def assign_images_randomly(file_path, image_urls):
    try:
        # Read the existing JSON file
        with open(file_path, "r") as file:
            json_data = json.load(file)

        # Validate the JSON structure
        if not isinstance(json_data, list):
            raise ValueError("Invalid JSON structure: Root element must be a list")

        # Randomly distribute image URLs to the dataset
        for listing in json_data:
            if not isinstance(listing, dict):
                raise ValueError(
                    "Invalid JSON structure: Each element must be an object"
                )
            # Assign a random image URL from the list
            listing["image_url"] = random.choice(image_urls)

        # Write updated JSON data back to the file
        with open(file_path, "w") as file:
            json.dump(json_data, file, indent=4)

        print("Image URLs assigned successfully!")
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except json.JSONDecodeError:
        print("Error: File is not a valid JSON.")
    except Exception as e:
        print(f"Error while processing JSON file: {e}")


# List of image URLs
image_urls = [
    f"image{i}.webp" for i in range(1, 16)
]  # e.g., image1.webp to image15.webp

# Path to the JSON file
file_path = "assets/data/air-bnb-listings.json"  # Update the path as needed

# Call the function
assign_images_randomly(file_path, image_urls)
